import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  useGSAP(() => {
    if (!isTablet) {
      const timeLine = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase", // 指定触发动画的元素，这里是id为"showcase"的section元素
          start: "top top", // 动画开始条件：当trigger元素的顶部到达视口顶部时
          end: "bottom top", // 动画结束条件：当trigger元素的底部到达视口顶部时
          scrub: true, // 启用滚动擦洗效果，动画进度随滚动位置实时更新
          pin: true, // 在动画播放期间，将trigger元素固定在视口中
        },
      });

      timeLine
        .to(".mask img", {
          transform: "scale(1.1)",
        })
        .to(".content", {
          opacity: 1,
          y: 0,
          ease: "power1.in",
        });
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      <div className="media">
        <video loop muted autoPlay playsInline>
          <source src="/videos/game.mp4" />
        </video>
        <div className="mask">
          <img src="/mask-logo.svg" alt="mask" />
        </div>
      </div>
      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>
            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 power
              </p>
              <p>
                It drives Apple intlligence on IPad. so you can write, create,
                and accomplish more with ease. All in a design thaat's
                unblievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness.And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="text-primary">
                Learn more about Apple intelligence
              </p>
            </div>
          </div>
          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
