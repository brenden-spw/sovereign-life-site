// Full-bleed mountain SVG — used as background for CTA sections
// The glowing ridge crest is the visual anchor

export function MountainCtaBg() {
  return (
    <svg
      viewBox="0 0 1400 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020202" />
          <stop offset="100%" stopColor="#080808" />
        </linearGradient>
        <linearGradient id="mc-overlay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.92)" />
        </linearGradient>
      </defs>

      <rect width="1400" height="480" fill="url(#mc-sky)" />

      {/* Far distant range */}
      <path
        d="M0 270 C180 242 380 234 580 224 C630 220 664 216 700 210 C736 216 770 220 820 224 C1020 234 1220 242 1400 270 L1400 480 L0 480Z"
        fill="rgba(255,255,255,0.04)"
      />

      {/* Secondary mid range */}
      <path
        d="M0 308 C130 284 280 274 440 270 C540 266 612 256 668 240 C682 232 690 224 700 212 C710 224 718 232 732 240 C788 256 860 266 960 270 C1120 274 1270 284 1400 308 L1400 480 L0 480Z"
        fill="rgba(255,255,255,0.058)"
      />

      {/* Main dark silhouette */}
      <path
        d="M0 480 L0 348 C100 334 220 324 360 314 C480 304 560 292 640 274 C666 264 682 252 700 234 C718 252 734 264 760 274 C840 292 920 304 1040 314 C1180 324 1300 334 1400 348 L1400 480Z"
        fill="rgba(5,5,5,0.98)"
      />

      {/* Glowing ridge crest — layered for depth */}
      <path
        d="M0 348 C100 334 220 324 360 314 C480 304 560 292 640 274 C666 264 682 252 700 234 C718 252 734 264 760 274 C840 292 920 304 1040 314 C1180 324 1300 334 1400 348"
        stroke="rgba(255,255,255,0.055)"
        strokeWidth="18"
        fill="none"
      />
      <path
        d="M0 348 C100 334 220 324 360 314 C480 304 560 292 640 274 C666 264 682 252 700 234 C718 252 734 264 760 274 C840 292 920 304 1040 314 C1180 324 1300 334 1400 348"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M0 348 C100 334 220 324 360 314 C480 304 560 292 640 274 C666 264 682 252 700 234 C718 252 734 264 760 274 C840 292 920 304 1040 314 C1180 324 1300 334 1400 348"
        stroke="rgba(255,255,255,0.52)"
        strokeWidth="0.85"
        fill="none"
      />

      {/* Summit accent — tiny highlight at the peak */}
      <path
        d="M694 248 C696 238 698 228 700 218 C702 228 704 238 706 248 C704 240 702 232 700 226 C698 232 696 240 694 248Z"
        fill="rgba(255,255,255,0.22)"
      />

      <rect width="1400" height="480" fill="url(#mc-overlay)" />
    </svg>
  );
}

// Variant with the mountain positioned slightly left — for hero pages
export function MountainHeroBg() {
  return (
    <svg
      viewBox="0 0 1400 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040404" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        <linearGradient id="mh-overlay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
          <stop offset="55%" stopColor="rgba(0,0,0,0.45)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.9)" />
        </linearGradient>
      </defs>

      <rect width="1400" height="680" fill="url(#mh-sky)" />

      {/* Distant range */}
      <path
        d="M0 380 C180 336 360 320 530 302 C620 292 660 277 700 258 C740 277 780 292 870 302 C1040 320 1220 336 1400 380 L1400 680 L0 680Z"
        fill="rgba(255,255,255,0.036)"
      />

      {/* Mid range */}
      <path
        d="M0 432 C130 396 270 376 420 382 C510 386 570 364 638 332 C664 316 682 277 700 162 C718 277 736 316 762 332 C830 364 890 386 980 382 C1130 376 1270 396 1400 432 L1400 680 L0 680Z"
        fill="rgba(255,255,255,0.056)"
      />

      {/* Left flank */}
      <path
        d="M0 680 C70 648 148 620 240 592 C340 562 415 534 486 503 C548 474 596 444 638 405 C666 379 684 343 698 293 L700 82 C693 149 682 205 667 253 C647 308 618 352 582 392 C540 440 488 474 422 507 C346 545 256 576 156 614 C82 638 36 660 0 680Z"
        fill="rgba(255,255,255,0.078)"
      />

      {/* Right flank */}
      <path
        d="M1400 680 C1364 660 1318 638 1244 614 C1144 576 1054 545 978 507 C912 474 860 440 818 392 C782 352 753 308 733 253 C718 205 707 149 700 82 L702 293 C716 343 734 379 762 405 C804 444 852 474 914 503 C985 534 1060 562 1160 592 C1252 620 1330 648 1400 680Z"
        fill="rgba(255,255,255,0.078)"
      />

      {/* Summit highlight */}
      <path
        d="M688 136 C692 113 696 91 699 69 L700 44 L701 69 C704 91 708 113 712 136 C708 123 704 109 700 97 C696 109 692 123 688 136Z"
        fill="rgba(255,255,255,0.24)"
      />

      {/* Primary ridgeline stroke */}
      <path
        d="M540 446 C568 413 596 377 620 339 C642 303 660 265 676 221 C686 189 694 153 700 82 C706 153 714 189 724 221 C740 265 758 303 780 339 C804 377 832 413 860 446"
        stroke="rgba(255,255,255,0.13)"
        strokeWidth="0.85"
        fill="none"
      />

      {/* Foreground ground */}
      <path
        d="M0 680 L0 663 C120 655 300 659 500 653 C610 650 672 648 700 646 C728 648 790 650 900 653 C1100 659 1280 655 1400 663 L1400 680Z"
        fill="rgba(0,0,0,0.7)"
      />

      <rect width="1400" height="680" fill="url(#mh-overlay)" />
    </svg>
  );
}
