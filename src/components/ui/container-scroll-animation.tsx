"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.82, 0.96] : [1.04, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={containerRef} className="relative flex h-[44rem] items-center justify-center overflow-hidden px-2 py-10 md:h-[62rem] md:px-10">
      <div className="relative w-full py-10 md:py-28" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} translate={translate}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: string | React.ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 18px 40px rgba(17,42,79,0.18), 0 58px 90px rgba(200,16,46,0.12), 0 120px 140px rgba(17,42,79,0.10)",
      }}
      className={cn(
        "mx-auto -mt-8 h-[25rem] w-full max-w-5xl rounded-[30px] border border-white/40 bg-navy p-2 shadow-2xl md:h-[36rem] md:p-5",
        "ring-1 ring-gold/20",
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-[24px] bg-surface-soft">{children}</div>
    </motion.div>
  );
}
