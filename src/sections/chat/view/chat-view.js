'use client';

import { useCallback, useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

// import { useGetContacts, useGetConversation, useGetConversations } from 'src/api/chat';

import { useSettingsContext } from 'src/components/common/settings';

import ChatHeaderCompose from '../chat-header-compose';
import ChatHeaderDetail from '../chat-header-detail';
import ChatMessageInput from '../chat-message-input';
import ChatMessageList from '../chat-message-list';
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';

// ----------------------------------------------------------------------

export default function ChatView() {
  const router = useRouter();

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState([]);

  // *************** Commented for demo view ***********************
  // const { contacts } = useGetContacts();
  // const { conversations, conversationsLoading } = useGetConversations();
  // const { conversation, conversationError } = useGetConversation(`${selectedConversationId}`);

  const { contacts } = { contacts: [] };

  const { conversations, conversationsLoading } = {
    conversations: undefined,
    conversationsLoading: true,
  };

  const { conversation, conversationError } = { conversation: undefined, conversationError: true };

  const participants = conversation
    ? conversation.participants?.filter((participant) => participant.id !== `${user.id}`)
    : [];

  useEffect(() => {
    if (conversationError || !selectedConversationId) {
      router.push(paths.dashboard.messages.root);
    }
  }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);

  const details = !!conversation;

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <>{details && <ChatHeaderDetail participants={participants} />}</>
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
      )}
    </Stack>
  );

  const renderNav = (
    <ChatNav
      contacts={contacts}
      conversations={conversations}
      loading={conversationsLoading}
      selectedConversationId={selectedConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={conversation?.messages} participants={participants} />

      <ChatMessageInput
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        //
        selectedConversationId={selectedConversationId}
        disabled={!recipients.length && !selectedConversationId}
      />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Messages
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {conversations && renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {details && renderMessages}

            {details && <ChatRoom conversation={conversation} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
