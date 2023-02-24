import Home from "./Components/Home/Home";
import {Route, Routes} from 'react-router-dom'
import Search from "./Components/Search/Search";
import Explore from "./Components/Explore/Explore";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import DetailTVShow from "./Components/TVShow/DetailTVShow";
import PlayTVShow from './Components/TVShow/PlayTVShow'
import PlayMovie from "./Components/Movie/PlayMovie";
import DetailMovie from "./Components/Movie/DetailMovie";
import Bookmarked from "./Components/Bookmarked/Bookmarked";
import History from './Components/History/History'
import Profile from "./Components/Profile/Profile";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/search' element={<Search />} />
      <Route path='/search/:query' element={<Search />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/tv/detail/:id' element={<DetailTVShow />} />
      <Route path='/tv/play/:id' element={<PlayTVShow />} />
      <Route path='/movie/play/:id' element={<PlayMovie />} />
      <Route path='/movie/detail/:id' element={<DetailMovie />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/bookmarked' element={<Bookmarked />} />
      <Route path='/history' element={<History />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<NotFound />} />
      
    </Routes>
  );
} 

export default App;
