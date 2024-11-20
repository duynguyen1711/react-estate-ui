import "./slider.scss";

const Slider = ({ images }) => {
    return (
        <div className="slider">
            <div className="fullSlider">
                <div className="arrow">
                    <img src="/arrow.png" />
                </div>
                <div className="imgContainer"></div>
                <div className="arrow">
                    <img src="/arrow.png" />
                </div>
            </div>

            <div className="bigImage">
                <img src={images[0]} />
            </div>
            <div className="smallImages">
                {images.slice(1).map((image, index) => (
                    <img src={image} key={index} />
                )
                )}
            </div>
        </div>
    )
}

export default Slider
