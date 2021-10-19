import { useState, useEffect } from 'react'
import List from './components/List'

function App() {

  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    body: ''
  })

  const fetchData = async () => {
    await fetch('/v1/todos', {
      method: 'GET',
      headers: {
        "access-control-allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      },
    })
      .then(response => response.json())
      .then(data => setTodos(data.data))
  }

  useEffect(() => {
    fetchData()
  }, [loading])


  const postData = async () => {
    setLoading(true)
    await fetch('/v1/todos', {
      method: 'POST',
      headers: {
        "access-control-allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => setLoading(false))
  }

  const updateData = async (id) => {
    setLoading(true)
    await fetch(`/v1/todos/${id}`, {
      method: 'PUT',
      headers: {
        "access-control-allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => setLoading(false))
  }

  const deleteData = async (id) => {
    setLoading(true)
    await fetch(`/v1/todos/${id}`, {
      method: 'DELETE',
      headers: {
        "access-control-allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => setLoading(false))

  }

  const editToForm = (todo) => {
    setFormData({
      id: todo.id,
      title: todo.title,
      body: todo.body
    })
  }

  const saveOrUpdate = (event) => {
    event.preventDefault();
    if (formData.id) {
      updateData(formData.id)
    } else {
      postData()
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      body: ''
    })
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='p-5'>
          <h3 className='text-lg text-center'>Todo List</h3>
          <form onSubmit={saveOrUpdate} >
            <input type='hidden' name='id' value={formData.id} />
            <div className='w-full'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    title: e.target.value,
                  }))
                }
                className='border w-full'
              />
            </div>
            <div className='w-full'>
              <label>Text</label>
              <textarea
                name='body'
                value={formData.body}
                onChange={(e) =>
                  setFormData((state) => ({
                    ...state,
                    body: e.target.value,
                  }))
                }
                className='border w-full'
              >
              </textarea>
            </div>
            <div className='w-full'>
              <button className='bg-blue-500 rounded-full w-full p-3 text-white'>Save</button>
            </div>
          </form>
        </div>
        {loading ? <div className='text-center'>Loading...</div> : <List todos={todos} onDelete={deleteData} onEdit={editToForm} />}
      </div>
    </div>
  );
}

export default App;
