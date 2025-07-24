import { FC, Fragment, PropsWithChildren } from "react";
import { Loader } from "../loader/loader";

export const LoadingProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Loader />
      {children}
    </Fragment>
  );
};
