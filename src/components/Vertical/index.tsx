import clsx from "clsx";
import { HorizontalProps } from "../Horizontal";
import styles from "./style.module.scss";

const Vertical = ({
  _ref,
  gap,
  style,
  className,
  children,
}: HorizontalProps) => {
  return (
    <div
      ref={_ref}
      className={clsx(styles.vertical, className)}
      style={{ gap, ...style }}>
      {children}
    </div>
  );
};

export default Vertical;
