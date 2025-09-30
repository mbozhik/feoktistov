import Container from '~/Global/Container'
import Media from '~~/index/Media'

export default function Home() {
  return (
    <Container>
      <Media token="overview" />
      <div className="bg-background">bozzhik.com</div>
      <Media token="sequence" />
      <div className="bg-background">snable.website</div>
    </Container>
  )
}
