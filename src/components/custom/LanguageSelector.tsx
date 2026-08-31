'use client';

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface LanguageSelectorProps {
  open: boolean;
}

export function LanguageSelector({ open }: LanguageSelectorProps) {
  const { i18n } = useTranslation('common');

  const router = useRouter();

  const handleLanguageChange = (val: string) => {
    i18n.changeLanguage(val);
    router.refresh();
  };

  const languageItems = [
    {
      label: '日本語',
      value: 'ja',
    },
    {
      label: '한국어',
      value: 'ko',
    },
    {
      label: 'English',
      value: 'en',
    },
  ];

  return (
    <>
      <Select
        defaultValue={i18n.language}
        onValueChange={(val) => {
          handleLanguageChange(val);
        }}
      >
        <SelectTrigger
          className={`${open ? 'flex' : 'hidden'} md:flex w-20 h-8 md:h-10 bg-transparent text-white justify-evenly border border-gray-500 rounded p-1 mx-2`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languageItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
