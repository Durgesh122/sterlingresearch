import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>My Awesome React Website</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main>
        <section id="home" className="hero">
          <h2>Welcome to the Best Website</h2>
          <p>Built with React + Vite + Javascript</p>
          <button onClick={() => alert('Welcome!')}>Get Started</button>
        </section>
        <section id="about" className="features">
          <div className="feature">
            <h3>Fast</h3>
            <p>Powered by Vite for lightning fast HMR.</p>
          </div>
          <div className="feature">
            <h3>Modern</h3>
            <p>Using the latest React features.</p>
          </div>
          <div className="feature">
            <h3>Clean</h3>
            <p>Simple and elegant design.</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 My Awesome Website. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
