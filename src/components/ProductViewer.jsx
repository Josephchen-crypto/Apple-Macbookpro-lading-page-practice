const ProductViewer = () => {
  return (
    <section
      id="product-viewer"
      className="container relative min-h-[93vh] mx-auto px-5 2xl:px-0 border border-red-600"
    >
      <h2>Take a closer look.</h2>
      <div>
        <p className="info">MacBookPro 16" in Space Black</p>
        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div className="bg-neutral-300" />
            <div className="bg-neutral-900" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductViewer;
