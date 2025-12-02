import { FC } from "react";

type SystemMessageProps = {
  content: string;
};

export const SystemMessage: FC<SystemMessageProps> = ({ content }) => {
  return <div>{content}</div>;
};
