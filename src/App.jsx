import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { getAccountAPI } from './services/api.services';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';
function App() {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    try {
      const res = await getAccountAPI();
      console.log("🚀 ~ fetchUserInfo ~ res:", res);

      if (res.data) {
        setUser(res.data.data.user);
        console.log("user data", res.data);
      }
    }
    catch {

    }
    setIsAppLoading(false);
  }
  return (
    <>
      {
        isAppLoading === true ?
          <div style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }} >
            <Spin />
          </div>
          :
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
      }
    </>
  )
}

export default App
