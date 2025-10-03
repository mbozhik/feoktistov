import Container from '~/Global/Container'
import Media from '~~/index/Media'
import Projects from '~~/index/Projects'

export default function Home() {
  return (
    <Container offset={false}>
      <Media token="overview" />
      <Projects />
      <Media token="sequence" />
      <div className="bg-background">snable.website</div>
    </Container>
  )
}
