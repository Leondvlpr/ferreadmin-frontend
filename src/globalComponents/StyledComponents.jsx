import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { globalColors } from './utils/GlobalColors';

export const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: globalColors.dominant,
    fontFamily: 'Public Sans, sans-serif',
    height: '48px',
    boxShadow: 'none',
    borderRadius: '8px',
    textTransform: 'none',
    fontWeight: '900',
    width: '100%',
    '&:hover': {
        backgroundColor: globalColors.hover,
        boxShadow: 'none'
    },
    '&:disabled': {
        backgroundColor: globalColors.hover,
        boxShadow: 'none',
        cursor: 'not-allowed'
    },
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        color: 'black', // Color del texto
        fontFamily: 'Public Sans, sans-serif',
        height: '18px',
        transition: '.2s'
    },
    '& .MuiInputBase-root': {
        borderRadius: '8px', // Aplica el borderRadius al contenedor principal
        transition: '.2s',
        width: '100%'
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'Public Sans, sans-serif',
        color: globalColors.dominant,
        transition: '.2s'
    },
    '& .MuiInputLabel-shrink': {
        color: globalColors.dominant, // Color del label cuando está seleccionado
        fontWeight: '900',
        transition: '.2s'
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#444f5c', // Color de la línea antes de enfocar
        transition: '.2s'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#444f5c', // Color de la línea al pasar el ratón
        transition: '.2s'
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: globalColors.dominant, // Color de la línea después de enfocar
        transition: '.2s'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#e3e3e3', // Color del borde del campo
            transition: '.2s'
        },
        '&:hover fieldset': {
            borderColor: globalColors.dominant, // Color del borde del campo al pasar el ratón
            transition: '.2s'
        },
        '&.Mui-focused fieldset': {
            borderColor: globalColors.dominant, // Color del borde del campo después de enfocar
            transition: '.2s'
        },
    },
}));