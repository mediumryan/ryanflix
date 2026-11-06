"use client";
import { useTranslation } from 'react-i18next';

interface SearchResultLabelProps {
  dataLength: number;
  keyword: string;
}

const SearchResultLabel = ({ dataLength, keyword }: SearchResultLabelProps) => {
  const {i18n} = useTranslation();
  
  return (
    <h2 className="px-6 pb-12 pt-16 text-center text-2xl font-bold italic">
      {dataLength > 0
        ? i18n.t('search.results', { keyword })
        : i18n.t('search.noResults', { keyword })}
    </h2>
  )
}

export default SearchResultLabel