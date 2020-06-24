export default class extends React.Component {
  render() {
    return (
      <div className="container">
          <h1> Created by pbtxt </h1>
          <p>Nextjs course on platzi </p>
        <img src="/logo.png" alt="logo" />
        <style>
          {`
            h1, p {
                color:white; 
                text-align: center;
            } 

            .container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            img {
                max-width: 30%;
                display: block;
            }

            `}
        </style>
        <style jsx global>{`
          body {
            background: black;
          }
        `}</style>
      </div>
    )
  }
}
