// Util Imports
import { menuClasses } from '@menu/utils/menuClasses'

// const menuSectionStyles = (verticalNavOptions, theme) => {
//   // Vars
//   const { isCollapsed, isHovered } = verticalNavOptions
//   const collapsedNotHovered = isCollapsed && !isHovered

//   return {
//     root: {
//       marginBlockStart: theme.spacing(0),
//       [`& .${menuClasses.menuSectionContent}`]: {
//         color: 'var(--mui-palette-text-disabled)',
//         paddingInline: '12px !important',
//         paddingBlock: `${theme.spacing(collapsedNotHovered ? 3.625 : 1.5)} !important`,
//         marginBlockStart: theme.spacing(3.5),
//         '&:before': {
//           content: '""',
//           blockSize: 1,
//           inlineSize: '1.375rem',
//           backgroundColor: 'var(--mui-palette-text-disabled)'
//         },
//         ...(!collapsedNotHovered && {
//           '&:before': {
//             content: 'none'
//           }
//         }),
//         [`& .${menuClasses.menuSectionLabel}`]: {
//           flexGrow: 0,
//           textTransform: 'uppercase',
//           fontSize: '13px',
//           lineHeight: 1.38462,
//           letterSpacing: '0.4px',
//           ...(collapsedNotHovered && {
//             display: 'none'
//           })
//         }
//       }
//     }
//   }
// }
//changes here pooja

// const menuSectionStyles = (verticalNavOptions, theme) => {
//   const { isCollapsed, isHovered } = verticalNavOptions
//   const collapsedNotHovered = isCollapsed && !isHovered

//   return {
//     root: {
//       marginBlockStart: theme.spacing(0),
//       backgroundColor: '#ffffff', // <-- background color yaha
//       [`& .${menuClasses.menuSectionContent}`]: {
//         color: 'var(--mui-palette-text-disabled)',
//         paddingInline: '12px !important',
//         paddingBlock: `${theme.spacing(collapsedNotHovered ? 3.625 : 1.5)} !important`,
//         marginBlockStart: theme.spacing(3.5),
//         '&:before': {
//           content: '""',
//           blockSize: 1,
//           inlineSize: '1.375rem',
//           backgroundColor: 'var(--mui-palette-text-disabled)'
//         },
//         ...(!collapsedNotHovered && {
//           '&:before': {
//             content: 'none'
//           }
//         }),
//         [`& .${menuClasses.menuSectionLabel}`]: {
//           flexGrow: 0,
//           textTransform: 'uppercase',
//           fontSize: '13px',
//           lineHeight: 1.38462,
//           letterSpacing: '0.4px',
//           ...(collapsedNotHovered && {
//             display: 'none'
//           })
//         }
//       }
//     }
//   }
// }


const menuSectionStyles = (verticalNavOptions, theme) => {
  const { isCollapsed, isHovered } = verticalNavOptions
  const collapsedNotHovered = isCollapsed && !isHovered

  return {
    root: {
      marginBlockStart: theme.spacing(0),
      backgroundColor: '#ffffff', // background white
      [`& .${menuClasses.menuSectionContent}`]: {
        color: '#6B7280', // text grey
        paddingInline: '12px !important',
        paddingBlock: `${theme.spacing(collapsedNotHovered ? 3.625 : 1.5)} !important`,
        marginBlockStart: theme.spacing(3.5),
        '&:before': {
          content: '""',
          blockSize: 1,
          inlineSize: '1.375rem',
          backgroundColor: '#D1D5DB' // divider grey
        },
        ...(!collapsedNotHovered && {
          '&:before': {
            content: 'none'
          }
        }),
        [`& .${menuClasses.menuSectionLabel}`]: {
          flexGrow: 0,
          textTransform: 'uppercase',
          fontSize: '13px',
          lineHeight: 1.38462,
          letterSpacing: '0.4px',
          color: '#6B7280', // section label grey
          ...(collapsedNotHovered && {
            display: 'none'
          })
        },
        // icons ke liye
        [`& .${menuClasses.menuItemIcon}`]: {
          color: '#6B7280'
        }
      }
    }
  }
}


export default menuSectionStyles
