import Link from 'next/link';

type FooterSectionProps = {
  title: string;
  items: { label: string; href?: string }[];
};

export const FooterSection = ({ title, items }: FooterSectionProps) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
    <ul className="mt-2 space-y-1 text-sm text-gray-400">
      {items.map((item, index) => (
        <li key={index}>
          {item.href ? (
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  </div>
);
