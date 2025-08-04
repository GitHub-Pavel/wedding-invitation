import { Color } from "@/shared/const/styles";
import { Telegram } from "@/shared/icons/telegram";
import {
  IconButton,
  IconButtonPosition,
  IconButtonSize,
} from "@/shared/ui/icon-button";
import { FC } from "react";

export const ChatForGuests: FC = () => {
  return null;
  return (
    <IconButton
      enableStroke
      icon={Telegram}
      color={Color.light}
      hoverColor={Color.dark}
      size={IconButtonSize.xs}
      className="chat-for-guests"
      position={IconButtonPosition.right}
    >
      Чат для гостей
    </IconButton>
  );
};
