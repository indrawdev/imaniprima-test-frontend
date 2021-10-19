import Item from './Item'

const List = ({ todos, onDelete, onEdit }) => {

  return (
    <div className='p-5'>
      <table className="table-auto border-collapse border border-green-800">
        <thead>
          <tr>
            <th>Name</th>
            <th>Todo</th>
            <th>Status</th>
            <th>Title</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? todos.map((todo, index) => {
            return <Item key={index} todo={todo} onDelete={onDelete} onEdit={onEdit} />
          }) : 'Empty data'}
        </tbody>
      </table>
    </div>
  )
}

export default List