import HotelService from "../common/HotelService";
import Parallax from "../common/Parallax";
import RoomSearch from "../common/RoomSearch";
import MainHeader from "../layout/MainHeader";
import RoomCarousel from "../room/RoomCarousel";

const Home = () => {
    return (
        <section className="home-page">
            <MainHeader />

            <div className="container home-content">
                <div className="home-section">
                    <RoomSearch />
                </div>

                <div className="home-section">
                    <RoomCarousel />
                </div>

                <div className="home-section full-width">
                    <Parallax />
                </div>

                <div className="home-section">
                    <RoomCarousel />
                </div>

                <div className="home-section">
                    <HotelService />
                </div>

                <div className="home-section full-width">
                    <Parallax />
                </div>

                <div className="home-section">
                    <RoomCarousel />
                </div>
            </div>
        </section>
    );
};

export default Home;
