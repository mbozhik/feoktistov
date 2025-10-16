import Container from '~/Global/Container'
import Media from '~~/index/Media'
import Projects from '~~/index/Projects'
import News from '~~/index/News'

export default function Home() {
  return (
    <Container offset={false}>
      <Media token="overview" />
      <Projects />
      <Media token="sequence" />
      <News />
    </Container>
  )
}
