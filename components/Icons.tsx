import React from 'react';

export const ArrowsPointingOutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const TrashIcon: React.FC<{ className?: string; onClick?: (event: React.MouseEvent<SVGSVGElement>) => void; }> = ({ className, onClick }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"} onClick={onClick}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.898 20.575 16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.953-2.953L12 17.25l1.175-.398a3.375 3.375 0 0 0 2.953-2.953L16.5 12.75l.398 1.175a3.375 3.375 0 0 0 2.953 2.953L21 17.25l-1.175.398a3.375 3.375 0 0 0-2.953 2.953Z" />
    </svg>
);

export const SpeakerWaveIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

export const CheckBadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const LightBulbIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-4.665a5.98 5.98 0 0 0-1.5-4.5A5.98 5.98 0 0 0 9 3.546A6.01 6.01 0 0 0 7.5 8.25m5.25 0a4.5 4.5 0 0 1-9 0" />
    </svg>
);


export const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-2.29-2.29l-3.376-.844a1.5 1.5 0 0 1-.986-1.936l1.3-4.923a1.5 1.5 0 0 1 1.936-.986l4.923 1.3a3 3 0 0 0 2.29 2.29l.844 3.376a1.5 1.5 0 0 1-1.936.986l-4.923-1.3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 4.5V2.25m0 2.25H15m-2.25 0L16.5 3M12.75 9V6.75m0 2.25H15m-2.25 0L16.5 7.5m-3.75 3.75h2.25m-2.25 0V15m2.25 0L13.5 16.5m2.25-2.25h2.25m-2.25 0V15m2.25 0L18 16.5m-2.25-2.25h2.25m-2.25 0V15m2.25 0L20.25 16.5" />
    </svg>
);

// FIX: Add missing icons used across various pages.
export const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
);

export const ListBulletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const PhotoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

// --- AIO Admin Page UI ---
export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
  </svg>
);

export const DocumentCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.25 9.75A4.5 4.5 0 0 1 12 15.75v3.375m0 0L11.25 19.5m0 0L10.5 21m1.5-1.5L13.5 21m0 0L12.75 19.5m2.625-3.375a4.5 4.5 0 0 1 4.5 0m0 0a4.5 4.5 0 0 1-4.5 0M10.5 2.25a4.5 4.5 0 0 0-4.5 4.5v.375m0 0c0 .552.448 1 1 1h1.5M10.5 8.25V6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
    </svg>
);

export const ArrowPathIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001a.75.75 0 0 1 .75.75v3.675a.75.75 0 0 1-.75.75H16.023m-1.001-4.905a7.5 7.5 0 1 0-1.265 12.138M12 15V9" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 19.82a2.25 2.25 0 0 1-1.06.632l-3.692 1.23a.75.75 0 0 1-.938-.94l1.23-3.692a2.25 2.25 0 0 1 .632-1.06l14.093-14.093Z" />
    </svg>
);

export const RocketLaunchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.82m5.84-2.56v4.82a6 6 0 0 1-1.158 3.585l-1.32 1.32M15.59 14.37l-1.32-1.32a6 6 0 0 1-1.158-3.585V4.82m5.84 2.56a6 6 0 0 1-7.38 5.84m0 0a6 6 0 0 1-5.84-7.38m5.84 2.56H8.25m5.84 0V8.25m0 5.84a6 6 0 0 1-5.84 7.38m5.84-2.56a6 6 0 0 1-5.84 7.38m0-11.68a6 6 0 0 1 7.38-5.84m-7.38 5.84H8.25m5.84 0V8.25" />
    </svg>
);

export const Cog6ToothIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.242 1.453l-1.028.925c-.246.221-.383.535-.383.856v2.593c0 .322.137.636.383.856l1.028.925a1.125 1.125 0 0 1 .242 1.453l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.47 6.47 0 0 1-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.47 6.47 0 0 1-.22-.127c-.325-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .242-1.453l1.028-.925c.246-.221.383-.535-.383-.856v-2.593c0-.322-.137-.636-.383-.856l-1.028-.925a1.125 1.125 0 0 1-.242-1.453l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.075-.124a6.47 6.47 0 0 1 .22-.127c.332-.183.582-.495.645-.87l.213-1.281ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

export const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.267c-.204.014-.407.026-.61.042a23.455 23.455 0 0 1-4.522 0c-.203-.016-.406-.028-.61-.042l-3.722-.267A2.25 2.25 0 0 1 3 14.894V10.608c0-.97.616-1.813 1.5-2.097m16.5 0-3-3m-3.75 0-3 3m-3.75 0-3-3m16.5 0-3 3M3.75 5.511c.884-.284 1.5-1.128 1.5-2.097V2.106a2.25 2.25 0 0 0-1.98-2.193l-3.722-.267c-.204-.014-.407-.026-.61-.042a23.455 23.455 0 0 0-4.522 0c-.203.016-.406-.028-.61-.042L1.98.213A2.25 2.25 0 0 0 0 2.406v4.286c0 .97.616 1.813 1.5 2.097m0 0-3-3m3 3 .75-3.75m0 0-3 3" />
    </svg>
);

export const ArrowUturnLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

// --- HEART ICON ---
export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);


// --- NEW ArrowTrendingUpIcon ICON ---
export const BananaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className={className || "w-6 h-6"}>
      <g>
        <path d="M439.1,206.5c-1.6-12.7-4.1-25.3-7.5-37.4c-12.7-45.2-34.1-85.3-62.4-119.2c-15-18-32.2-33.8-51-46.9   c-1.3-0.9-2.6-1.8-3.9-2.7c-5.1-3.5-10.4-6.8-15.9-9.7c-17.7-9.4-36.9-14.8-56.5-16.2c-20.2-1.4-40.2,1-59.2,7.2   c-12.9,4.2-25.2,10-36.6,17.2c-20.8,13.1-39.1,29.9-54.2,49.2c-21.7,27.7-38.1,60.2-48.2,95.1c-5.8,20.1-9.1,41.1-9.7,62.3   c-0.6,22.3,1.3,44.5,6,65.8c6.3,28.6,16.8,55.9,30.8,81.1c16,28.9,36.3,55.1,59.9,77.7c25.2,24.3,53.8,44.7,84.7,60.2   c16.1,8.1,32.9,14.6,50.1,19.3c15.8,4.3,31.9,7,48,7.9c5.6,0.3,11.2,0.5,16.8,0.5c1.4,0,2.8,0,4.2-0.1c1-0.1,2-0.1,3-0.2   c5.1-0.4,10.2-1,15.2-1.8c27.1-4.4,53-13.8,76.5-27.5c28.1-16.5,52.8-38.8,72.6-64.8c18-23.7,31.7-50.5,40.4-78.9   c9.6-31.4,13.7-64.5,11.8-97.6c-1.5-25.3-6.1-50.2-13.3-74.2c-3.1-10.3-6.6-20.4-10.6-30.2c-2.3-5.6-4.8-11.1-7.4-16.5   C440.6,215,440.2,210.7,439.1,206.5z" fill="#f0c419"/>
        <path d="M410.7,185.8c-1.5-12.1-3.9-24.1-7.2-35.6c-12-43-32.4-81.1-59.3-113.3c-14.2-17.1-30.6-32.2-48.5-44.6   c-1.2-0.9-2.5-1.7-3.7-2.6c-4.8-3.3-9.9-6.5-15.1-9.2c-16.8-9-35.1-14.1-53.7-15.4c-19.2-1.3-38.2,1-56.3,6.8   c-12.3,3.9-24,9.5-34.8,16.3c-19.8,12.5-37.2,28.4-51.5,46.8c-20.6,26.3-36.2,57.2-45.8,90.4c-5.5,19.1-8.7,39.1-9.2,59.2   c-0.6,21.2,1.2,42.3,5.7,62.6c6,27.2,16,53.2,29.3,77.1c15.2,27.5,34.5,52.4,57,73.9c24,23.1,51.1,42.5,80.5,57.2   c15.3,7.7,31.3,13.9,47.6,18.4c15,4.1,30.3,6.7,45.6,7.5c5.3,0.3,10.7,0.5,16,0.5c1.3,0,2.7,0,4-0.1c1-0.1,1.9-0.1,2.9-0.2   c4.9-0.4,9.7-1,14.5-1.7c25.8-4.2,50.4-13.1,72.7-26.1c26.7-15.7,50.2-36.9,69-61.6c17.1-22.5,30.1-48,38.4-75   c9.1-30,13-61.3,11.2-92.8c-1.4-24.1-5.8-47.7-12.7-70.6c-3-9.8-6.3-19.4-10.1-28.7c-2.2-5.3-4.6-10.6-7-15.7   C412.2,194.2,411.7,189.9,410.7,185.8z" fill="#FFF8E7"/>
      </g>
    </svg>
);


// --- NEW ICONS FOR WRITING PAGE ---

export const LineGraphIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941" />
    </svg>
);

export const BarChartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

export const PieChartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
);

export const TableIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125V6.375m1.125 13.125A1.125 1.125 0 0 0 4.5 18.375h15a1.125 1.125 0 0 0 1.125-1.125V6.375A1.125 1.125 0 0 0 19.5 5.25h-15A1.125 1.125 0 0 0 3.375 6.375v11.953M3.375 10.5h17.25" />
    </svg>
);

export const DiagramIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h-7a.5.5 0 0 0-.5.5v12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V7.25a.5.5 0 0 0-.5-.5Z" />
    </svg>
);

export const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9 6.75L2.25 6.75" />
    </svg>
);

export const EssayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

export const PictureIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const AcademicCapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
);

// --- UPDATED ICONS FOR EXAM PAGE ---
export const TOEICIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m0 0H9m3 0h3m-3 0V1.5M12 21h3m-3 0H9m12-6.75h-3.375M3 14.25H6.375m-3.375 0v-3.75h3.375v3.75m14.25-3.75h-3.375v3.75h3.375M3 10.5h18" />
    </svg>
);

export const IELTSIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12H9m3-3v6m-3-3h2.25a2.25 2.25 0 0 1 2.25 2.25V15" />
    </svg>
);

export const VSTEPIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.758 2.82c-.996.59-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);

// --- NEW ICONS FOR PRACTICE PAGE ---
export const QuestionMarkCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
    </svg>
);

export const LockClosedIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);

// --- NEW ICONS FOR CAMBRIDGE EXAMS ---
export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.563.563 0 0 0-.586 0L6.982 21.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.563.563 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
);
export const MoverIcon: React.FC<{ className?: string }> = ({ className }) => ( // Kite icon
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75l16.5 16.5M3.75 12h16.5m-16.5 0L12 3.75 20.25 12 12 20.25 3.75 12Z" />
    </svg>
);
export const FlyerIcon: React.FC<{ className?: string }> = ({ className }) => ( // Paper plane icon
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);

// NEW ICONS FOR CAMBRIDGE PRACTICE PAGE
export const XCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const LightBulbSolidIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
        <path d="M12 2.25a.75.75 0 0 1 .75.75v.518c.985.253 1.888.754 2.653 1.442a.75.75 0 0 1-.93 1.175A5.99 5.99 0 0 0 12 6.25a5.99 5.99 0 0 0-2.326 1.051.75.75 0 1 1-.93-1.175c.765-.688 1.668-1.189 2.653-1.442V3a.75.75 0 0 1 .75-.75Z" />
        <path fillRule="evenodd" d="M8.25 10.5a3.75 3.75 0 1 1 7.5 0v3.315c0 .354.128.692.36.963l.995 1.161a.75.75 0 0 1-.54 1.211H7.435a.75.75 0 0 1-.54-1.211l.995-1.161A2.25 2.25 0 0 0 8.25 13.815V10.5Zm3.75 11.25a.75.75 0 0 1-.75-.75v-2.25h1.5v2.25a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
);

export const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
        <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v1.5c0 .414.336.75.75.75h1.5c.414 0 .75-.336.75-.75v-1.5a.75.75 0 0 0 0-1.5h-3ZM9.75 3.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75ZM16.5 2.25a.75.75 0 0 0 0 1.5v1.5c0 .414.336.75.75.75h1.5c.414 0 .75-.336.75-.75v-1.5a.75.75 0 0 0 0-1.5h-3ZM4.125 7.5A.75.75 0 0 1 4.875 6.75h14.25a.75.75 0 0 1 0 1.5H4.875A.75.75 0 0 1 4.125 7.5ZM3.165 10.632a.75.75 0 0 1 .53-.223h16.61a.75.75 0 0 1 .53.223l1.523 1.524c.487.486.732 1.14.732 1.794v.85a.75.75 0 0 1-1.5 0v-.85c0-.285-.112-.558-.31-.755L19.875 12h-1.043c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h2.25a.75.75 0 0 1 0 1.5H18.375a.75.75 0 0 1-.75-.75v-1.5c0-.414-.336-.75-.75-.75h-1.043l-1.723 1.723a.75.75 0 0 1-1.06 0l-.001-.001-1.722-1.722h-1.043c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h2.25a.75.75 0 0 1 0 1.5H10.875a.75.75 0 0 1-.75-.75v-1.5c0-.414-.336-.75-.75-.75H8.332l-1.723 1.723a.75.75 0 0 1-1.06 0l-1.722-1.722H2.784c-.414 0-.75.336-.75.75v1.5c0 .414.336.75.75.75h2.25a.75.75 0 0 1 0 1.5H3.375a.75.75 0 0 1-.75-.75v-1.5c0-.414-.336-.75-.75-.75H.832L-.92 14.225a.75.75 0 0 1 .31-.755v-.85c0-.653.245-1.308.732-1.794l1.523-1.524Z" clipRule="evenodd" />
        <path d="M12 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    </svg>
);
// --- NEW ICONS FOR ASSET BROWSER ---
export const MusicalNoteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9c0 .531-.023 1.058-.068 1.579M9 9c-2.023 0-3.79.67-5.132 1.815M9 9c2.023 0 3.79.67 5.132 1.815m-5.132 1.815a5.25 5.25 0 0 0 0 9.36m5.132-9.36a5.25 5.25 0 0 1 0 9.36m-10.264-9.36a5.25 5.25 0 0 0-5.132 9.36c-1.145-1.34-1.815-3.111-1.815-5.132a5.25 5.25 0 0 1 1.815-5.132m15.396 0a5.25 5.25 0 0 0-5.132-9.36c1.146 1.34 1.816 3.111 1.816 5.132a5.25 5.25 0 0 1-1.816 5.132" />
    </svg>
);

export const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v6m0 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM8 8v3a4 4 0 0 0 8 0V8M5 10.5a7 7 0 0 0 14 0M12 19v4" />
    </svg>
);
