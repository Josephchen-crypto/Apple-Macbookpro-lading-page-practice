import { performanceImages } from "../constants";

const Performance = () => {
  return (
    <section id="performance">
      <h2>Next-level graphics performance. Game on.</h2>
      <div className="wrapper">
        {performanceImages.map((image) => (
          <img key={image.id} src={image.src} alt={image.id} />
        ))}
      </div>
    </section>
  );
};

export default Performance;
