'use client';

import { FaGithub, FaEnvelope } from 'react-icons/fa';
import { FooterSection } from './FooterSection';

const developers = [
  { label: '이한동' },
  { label: '주정혁' },
  { label: '고연수' },
];

const quickLinks = [
  { label: '소개', href: '/' },
  { label: '문의하기', href: '/suggestion' },
];

const contacts = [
  {
    icon: <FaEnvelope size={20} />,
    href: '/',
    label: 'Email',
  },
  {
    icon: <FaGithub size={20} />,
    href: '/',
    label: 'GitHub',
  },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-5 text-gray-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2
              className="text-xl font-bold text-white"
              style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}
            >
              studymate
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              함께 성장하는 스터디 플랫폼
            </p>
          </div>
          <FooterSection title="개발자" items={developers} />
          <FooterSection title="바로가기" items={quickLinks} />

          <div>
            <h3 className="text-sm font-semibold text-gray-500">Contact</h3>
            <div className="mt-2 flex items-center gap-4 text-gray-400">
              {contacts.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  aria-label={item.label}
                  className="hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-gray-300 pt-2 text-center text-sm text-gray-500">
          © 2025 <span className="font-semibold text-gray-500">studymate</span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};
