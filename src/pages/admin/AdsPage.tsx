import { useState } from 'react';
import {
  Title,
  Table,
  Badge,
  Group,
  ActionIcon,
  Image,
  Stack,
  Modal,
  TextInput,
  Select,
  Switch,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { useAds } from '../../contexts/AdsContext';
import type { Ad } from '../../data/ads';

export default function AdsPage() {
  const { t } = useTranslation();
  const { ads, addAd, updateAd, deleteAd } = useAds();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  const form = useForm({
    initialValues: {
      title: '',
      imageUrl: '',
      videoUrl: '',
      linkUrl: '',
      position: 'top' as 'top' | 'bottom',
      isActive: true,
    },
  });

  const openAddModal = () => {
    setEditingAd(null);
    form.reset();
    setModalOpen(true);
  };

  const openEditModal = (ad: Ad) => {
    setEditingAd(ad);
    form.setValues({
      title: ad.title,
      imageUrl: ad.imageUrl,
      videoUrl: ad.videoUrl || '',
      linkUrl: ad.linkUrl,
      position: ad.position,
      isActive: ad.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editingAd) {
      updateAd(editingAd.id, {
        ...form.values,
        videoUrl: form.values.videoUrl || undefined,
      });
    } else {
      const newAd: Ad = {
        ...form.values,
        id: `ad-${Date.now()}`,
        videoUrl: form.values.videoUrl || undefined,
      };
      addAd(newAd);
    }
    setModalOpen(false);
    notifications.show({ message: t('admin.adSaved'), color: 'teal' });
  };

  const handleDelete = (id: string) => {
    deleteAd(id);
    notifications.show({ message: t('admin.adDeleted'), color: 'red' });
  };

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Group justify="space-between">
        <Title order={2} fw={700}>
          {t('admin.manageAds')}
        </Title>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="gradient"
          gradient={{ from: 'teal.7', to: 'teal.5' }}
          onClick={openAddModal}
        >
          {t('admin.addAd')}
        </Button>
      </Group>

      <Table.ScrollContainer minWidth={700}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>{t('admin.adTitle')}</Table.Th>
              <Table.Th>{t('admin.adPosition')}</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>{t('admin.adActive')}</Table.Th>
              <Table.Th>{t('admin.carActions')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {ads.map((ad) => (
              <Table.Tr key={ad.id}>
                <Table.Td>
                  <Image src={ad.imageUrl} w={80} h={45} radius="sm" fit="cover" />
                </Table.Td>
                <Table.Td fw={500}>{ad.title}</Table.Td>
                <Table.Td>
                  <Badge color={ad.position === 'top' ? 'blue' : 'orange'} variant="light" size="sm">
                    {ad.position}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge color={ad.videoUrl ? 'purple' : 'gray'} variant="light" size="sm">
                    {ad.videoUrl ? 'Video' : 'Image'}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Switch
                    checked={ad.isActive}
                    onChange={() => updateAd(ad.id, { isActive: !ad.isActive })}
                    color="teal"
                  />
                </Table.Td>
                <Table.Td>
                  <Group gap={4}>
                    <ActionIcon
                      variant="subtle"
                      color="yellow"
                      size="sm"
                      onClick={() => openEditModal(ad)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      size="sm"
                      onClick={() => handleDelete(ad.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAd ? t('common.edit') : t('admin.addAd')}
        size="lg"
        centered
      >
        <Stack gap="md">
          <TextInput label={t('admin.adTitle')} {...form.getInputProps('title')} required />
          <TextInput label={t('admin.adImage')} {...form.getInputProps('imageUrl')} required />
          <TextInput label={t('admin.adVideo')} {...form.getInputProps('videoUrl')} />
          <TextInput label={t('admin.adLink')} {...form.getInputProps('linkUrl')} required />
          <Select
            label={t('admin.adPosition')}
            data={[
              { value: 'top', label: 'Top' },
              { value: 'bottom', label: 'Bottom' },
            ]}
            {...form.getInputProps('position')}
          />
          <Switch
            label={t('admin.adActive')}
            {...form.getInputProps('isActive', { type: 'checkbox' })}
            color="teal"
          />
          <Button
            variant="gradient"
            gradient={{ from: 'purple', to: 'teal' }}
            onClick={handleSave}
            fullWidth
          >
            {t('common.save')}
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
}
