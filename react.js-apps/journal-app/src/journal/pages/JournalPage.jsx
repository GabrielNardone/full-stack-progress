import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { starNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {

  const {isSaving, active} = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(starNewNote())
  }

  return (
    <JournalLayout>

      {(!!active) ? <NoteView/> :<NothingSelectedView/>}
      
      <IconButton
      disabled={isSaving}
      onClick={onClickNewNote}
      size='large'
      sx={{
        color: "white",
        backgroundColor: "#009B77",
        ":hover": {backgroundColor: "#009B77", opacity: 0.8},
        position: "fixed",
        right: 50,
        bottom: 50
      }}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>

    </JournalLayout>
  )
}
