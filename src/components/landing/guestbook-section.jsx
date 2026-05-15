import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GuestbookForm from './guestbook-form';
import GuestbookCard from './guestbook-card';
import { supabase } from '../../utils/supabase-client';

/**
 * GuestbookSection 컴포넌트
 *
 * Props: 없음
 *
 * Example usage:
 * <GuestbookSection />
 */
function GuestbookSection() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('portfolio_guestbook')
      .select('id, name, message, emoji, keyword, role, created_at')
      .order('created_at', { ascending: false })
      .limit(30);

    if (!error && data) setEntries(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <Box>
      <Divider sx={{ my: 3, borderColor: 'var(--color-border-light)' }} />
      <Typography
        sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-secondary)', mb: 2.5 }}
      >
        방명록
      </Typography>

      <GuestbookForm onSubmitSuccess={fetchEntries} />

      <Box sx={{ mt: 3 }}>
        {loading ? (
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', py: 2 }}>
            불러오는 중...
          </Typography>
        ) : entries.length === 0 ? (
          <Typography sx={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textAlign: 'center', py: 2 }}>
            아직 방명록이 없어요. 첫 번째로 남겨주세요 🌱
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {entries.map((entry) => (
              <GuestbookCard key={entry.id} {...entry} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default GuestbookSection;
