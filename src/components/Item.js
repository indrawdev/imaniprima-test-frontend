const Item = ({ todo, onDelete, onEdit }) => {

  return (
    <tr key={todo.id}>
      <td>{todo.todo.user.name}</td>
      <td>{todo.todo.title}</td>
      <td>{todo.todo.completed ? 'Done' : 'Not Finish'}</td>
      <td>{todo.title}</td>
      <td>{todo.body}</td>
      <td><button onClick={() => { onEdit(todo) }} className='bg-blue-500 rounded-full p-3 text-white'>Edit</button></td>
      <td><button onClick={() => { onDelete(todo.id) }} className='bg-red-500 rounded-full p-3 text-white'>Delete</button></td>
    </tr>
  )
}

export default Item