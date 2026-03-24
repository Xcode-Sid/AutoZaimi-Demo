import { useState } from 'react';
import { Box, CloseButton } from '@mantine/core';
import { useAds } from '../../contexts/AdsContext';

interface Props {
  position: 'top' | 'bottom';
}

export function AdBanner({ position }: Props) {
  const { getActiveAds } = useAds();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const activeAds = getActiveAds(position).filter((a) => !dismissed.includes(a.id));
  const ad = activeAds[0];

  if (!ad) return null;

  return (
    <Box
      style={{
        position: 'relative',
        maxHeight: 120,
        overflow: 'hidden',
        borderRadius: 'var(--mantine-radius-md)',
        margin: '0.5rem 1rem',
      }}
      className="glass-card animate-fade-in"
    >
      <a href={ad.linkUrl} style={{ display: 'block' }}>
        {ad.videoUrl ? (
          <video
            src={ad.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <img
            src={ad.imageUrl}
            alt={ad.title}
            style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
          />
        )}
      </a>
      <CloseButton
        size="sm"
        variant="filled"
        color="dark"
        style={{
          position: 'absolute',
          top: 6,
          right: 6,
          opacity: 0.7,
          zIndex: 2,
        }}
        onClick={() => setDismissed((prev) => [...prev, ad.id])}
      />
    </Box>
  );
}
