import './App.css'

function App() {

  const testfn = (input: React.MouseEvent) => {
    console.log('input', input);
  }

  return (
    <>
      <div className="card">
        <button onClick={testfn}>
          click me!
        </button>
      </div>
    </>
  )
}

export default App
