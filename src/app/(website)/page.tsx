import Container from '~/Global/Container'
import Media from '~~/index/Media'
import Projects from '~~/index/Projects'
import Achievements from '~~/index/Achievements'
import News from '~~/index/News'
import Team from '~~/index/Team'

export default function Home() {
  return (
    <Container offset={false} className="border-b-0">
      <Media token="overview" />
      <Projects />
      <Media token="sequence" />
      <Achievements />
      <News />
      <Team />
    </Container>
  )
}
