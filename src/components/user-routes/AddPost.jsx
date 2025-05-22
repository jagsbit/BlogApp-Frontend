import React, { useEffect, useRef, useState, useMemo } from 'react';
import { loadAllCategories } from '../../services/category-service';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { getUser } from '../../auth';
import { addPost } from '../../services/post-service';
import { data } from 'react-router-dom';
const AddPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const[user,setUser]=useState({})

  const config = useMemo(() => ({
    height: 300,
    readonly: false,
    toolbarAdaptive: true,
    placeholder: 'Start writing...',
  }), []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setUser(getUser())
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load categories");
      });
  }, []);

  const [formData, setFormData] = useState({
    postTitle: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      ...formData,
      postContent: editor.current?.value || content,
      userId:user.id,
      postDate:new Date().toISOString()
    };
     
    //console.log('Post Created:', finalData);

    // Add API logic here, example:
    // createPost(finalData).then(() => { ... }).catch(() => { ... })
    addPost(finalData).then((data)=>{console.log(data) 
      toast.success("Your Post Created SuccessFully")
      setFormData({
         postTitle: '',
         category: ''
      })
      setContent('');
      editor.current.value = '';
    }).catch((error)=>{console.log(error)})


  };

  const handleReset = () => {
    setFormData({
      postTitle: '',
      category: ''
    });
    setContent('');
    if (editor.current) {
      editor.current.value = '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Post Title</label>
            <input
              type="text"
              name="postTitle"
              value={formData.postTitle}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Post Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Post Content</label>
            <JoditEditor
              ref={editor}
              onBlur={(newContent) => setContent(newContent)}
              config={config}
              className="mt-1 w-full border rounded-md"
            />
          </div>

          {/* Post Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Post Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option value={category.catId} key={category.catId}>
                  {category.catName}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Post
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
