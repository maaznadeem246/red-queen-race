import React from "react";
import "./styles.css";
import useWebAnimations from "@wellyshen/use-web-animations";

const spritFrames = {
  transform: ["translateY(0)", "translateY(-100%)"]
};

const sceneryFrames = {
  transform: ["translateX(100%)", "translateX(-100%)"]
};

const sceneryTimingForeground = {
  duration: 12000,
  iterations: Infinity
};

const sceneryTimingBackground = {
  duration: 36000,
  iterations: Infinity
};

export default function App() {
  const redQuenRef = useWebAnimations({
    keyframes: {
      ...spritFrames
    },
    timing: {
      easing: "steps(7, end)",
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    }
  });

  const backGround1Movement = useWebAnimations({
    keyframes: {
      ...sceneryFrames
    },
    timing: {
      ...sceneryTimingBackground
    }
  });

  const backGround2Movement = useWebAnimations({
    keyframes: {
      ...sceneryFrames
    },
    timing: {
      ...sceneryTimingBackground
    }
  });

  const foreGround1Movement = useWebAnimations({
    keyframes: {
      ...sceneryFrames
    },
    timing: {
      ...sceneryTimingForeground
    }
  });

  const foreGround2Movement = useWebAnimations({
    keyframes: {
      ...sceneryFrames
    },
    timing: {
      ...sceneryTimingForeground
    }
  });

  if (
    foreGround1Movement.getAnimation() &&
    backGround1Movement.getAnimation()
  ) {
    foreGround1Movement.getAnimation().currentTime =
      foreGround1Movement.getAnimation().effect.getComputedTiming().duration /
      2;

    backGround1Movement.getAnimation().currentTime =
      backGround1Movement.getAnimation().effect.getComputedTiming().duration /
      2;
  }

  const adjustBackgroundPlayback = () => {
    let sceneries = [
      foreGround1Movement,
      foreGround2Movement,
      backGround1Movement,
      backGround2Movement
    ];

    let redQueenPlaybackRate = redQuenRef.getAnimation().playbackRate;

    if (redQueenPlaybackRate < 0.8) {
      sceneries.forEach(function(anim) {
        anim.getAnimation().updatePlaybackRate((redQueenPlaybackRate / 2) * -1);
      });
    } else if (redQueenPlaybackRate > 1.2) {
      sceneries.forEach(function(anim) {
        anim.getAnimation().updatePlaybackRate(redQueenPlaybackRate / 2);
      });
    } else {
      sceneries.forEach(function(anim) {
        anim.getAnimation().updatePlaybackRate(0);
      });
    }
  };

  if (redQuenRef.getAnimation()) {
    adjustBackgroundPlayback();

    setInterval(function() {
      /* Set decay */
      let redQueenPlaybackRate = redQuenRef.getAnimation().playbackRate;
      if (redQueenPlaybackRate > 0.4) {
        redQuenRef
          .getAnimation()
          .updatePlaybackRate(redQueenPlaybackRate * 0.9);
      }
      adjustBackgroundPlayback();
    }, 3000);
  }

  const goFaster = () => {
    let redQueenPlaybackRate = redQuenRef.getAnimation().playbackRate;
    redQuenRef.getAnimation().updatePlaybackRate(redQueenPlaybackRate * 1.1);
    adjustBackgroundPlayback();
  };

  return (
    <div
      className="App"
      onClick={() => goFaster()}
      onTouchStart={() => goFaster()}
    >
      <div className="wrapper">
        <div className="sky" />
        <div className="earth">
          <div id="red-queen_and_alice">
            <img
              id="red-queen_and_alice_sprite"
              ref={redQuenRef.ref}
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png"
              srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x"
              alt="Alice and the Red Queen running to stay in place."
            />
          </div>
        </div>

        <div
          className="scenery"
          id="foreground1Movement"
          ref={foreGround1Movement.ref}
        >
          <img
            id="palm3"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x"
            alt=" "
          />
        </div>
        <div
          className="scenery"
          id="foreground2Movement"
          ref={foreGround2Movement.ref}
        >
          <img
            id="bush"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x"
            alt=" "
          />
          <img
            id="w_rook_upright"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x"
            alt=" "
          />
        </div>
        <div
          className="scenery"
          id="background1Movement"
          ref={backGround1Movement.ref}
        >
          <img
            id="r_pawn_upright"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x"
            alt=" "
          />
          <img
            id="w_rook"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x"
            alt=" "
          />
          <img
            id="palm1"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x"
            alt=" "
          />
        </div>
        <div
          className="scenery"
          id="background2Movement"
          ref={backGround2Movement.ref}
        >
          <img
            id="r_pawn"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x"
            alt=" "
          />

          <img
            id="r_knight"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x"
            alt=" "
          />
          <img
            id="palm2"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png"
            srcset="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x"
            alt=" "
          />
        </div>
      </div>
    </div>
  );
}
