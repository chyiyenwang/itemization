import { ImageProps } from "next/image";
import Thumbnail from "./Thumbnail";

interface ThumbnailLinkProps extends ImageProps {
  href: string;
  rarity: string;
  src: string;
  type: string;
  alt: string;
}

export default function ThumbnailLink({
  href,
  rarity,
  src,
  type,
  alt,
  ...props
}: ThumbnailLinkProps) {
  return (
    <a href={href}>
      <Thumbnail rarity={rarity} src={src} type={type} alt={alt} {...props} />
    </a>
  );
}
