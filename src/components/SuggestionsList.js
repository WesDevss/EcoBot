import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Chip, Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 'high':
      return <ErrorIcon color="error" />;
    case 'medium':
      return <WarningIcon color="warning" />;
    default:
      return <CheckCircleIcon color="success" />;
  }
};

const SuggestionsList = ({ suggestions }) => {
  return (
    <List>
      {suggestions.map((suggestion) => (
        <ListItem
          key={suggestion.id}
          sx={{
            bgcolor: 'background.paper',
            mb: 1,
            borderRadius: 1,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <ListItemIcon>{getPriorityIcon(suggestion.priority)}</ListItemIcon>
          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {suggestion.title}
                <Chip
                  label={suggestion.priority === 'high' ? 'Alta' : 'Média'}
                  size="small"
                  color={suggestion.priority === 'high' ? 'error' : 'warning'}
                />
              </Box>
            }
            secondary={
              <>
                <Typography component="span" variant="body2" color="text.primary">
                  {suggestion.description}
                </Typography>
                <br />
                <Typography component="span" variant="body2" color="success.main">
                  Impacto: {suggestion.impact}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SuggestionsList; 