import Link from 'next/link'
import Error from './_error'

export default class extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      openPodcast: null
    }
  }

  static async getInitialProps({ query, res }) {
    let idChannel = query.id
    try {
      let [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      ])

      if(reqChannel.status>=400){
        res.statusCode = reqChannel.status
        return {channel:null, audio_clips:null, series:null, statusCode:reqChannel.status}
      }

      let dataChannel = await reqChannel.json()
      let channel = dataChannel.body.channel

      let dataAudios = await reqAudios.json()
      let audioClips = dataAudios.body.audio_clips

      let dataSeries = await reqSeries.json()
      let series = dataSeries.body.channels

      return { channel, audioClips, series, statusCode:200 }
    } catch (e) {
      return {channel:null, audio_clips:null, series:null, statusCode:503}
    }
  }

  openPodcast = (e, podcast) => {
    event.preventDefault()
    this.setState({
      openPodcast: podcast
    })
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props
    const {openPodcast} = this.state

    if(statusCode!==200){
      return <Error statusCode={statusCode}/>
    }
    return (
      <div>
        <header>Podcast</header>

        { openPodcast && <di>Hay un podcast abierto </di>}

        <h1>{channel.title}</h1>

        {audioClips.map((clip) => (
          <Link href={`/podcast?id=${clip.id}`}>
            <a className="clip">
              <div>{clip.title}</div>
            </a>
          </Link>
        ))}
        <h2>Ultimos Podcasts</h2>
        {audioClips.map((series) => (
          <Link href="#" >
            <a className="clipSerie" onClick={this.openPodcast}>
              <div>{series.title}</div>
            </a>
          </Link>
        ))}

        <style jsx>
          {`
            .channels {
              display: grid;
              grid-gap: 15px;
              padding: 15px;
              grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            header {
              color: #fff;
              background: #8756ca;
              padding: 15px;
              text-align: center;
            }
            .channel {
              display: block;
              border-radius: 3px;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
              margin-botton: 0.5em;
            }

            .channel img {
              width: 100%;
            }
            h2 {
              padding: 5px;
              font-size: 0.9em;
              font-weight: 600;
              margin: 0;
              text-align: center;
            }
          `}
        </style>
      </div>
    )
  }
}
