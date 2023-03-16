import Intro from '../components/Intro';
import Main from '../components/Main';
import Middlebar from '../components/Middlebar';
import Footer from '../components/footer';
import StatsCountry from '../components/Stats';
import ChartComponent from '../components/Charts';
function App(){
  return (
    <>
    <Intro />
    <StatsCountry />
    <Main />
    <ChartComponent />
    <Middlebar />
    <Footer />
     </>
  );
}

export default App;
