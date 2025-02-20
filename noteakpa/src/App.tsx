import { useState } from 'react'
import './App.css'
import { Todo } from './Todo'
import { TodoItem } from './types';

function App() {
    const [ todos, setTodos ] = useState<TodoItem[]>([]);
    const [ input, setInput ] = useState('');
}

export default App;