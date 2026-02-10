import Thumbnail from "./thumbnail";

interface ThumbnailLinkProps {
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
}: ThumbnailLinkProps) {
  return (
    <a href={href}>
      <Thumbnail rarity={rarity} src={src} type={type} alt={alt} />
    </a>
  );
}
