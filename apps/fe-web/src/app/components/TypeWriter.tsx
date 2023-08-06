import {useEffect, useState} from 'react';

enum state
{
    PauseWrite = "PauseWrite",
    Write = "Write",
    PauseDelete = "PauseDelete",
    Delete = "Delete"
}

export interface PropType
{
    wordStyle: string,

    words: string[],
    cursor?: string,

    writeSpeed?: number,
    deleteSpeed?: number,

    pauseWriteDelay?: number
    pauseDeleteDelay?: number,

    highlightOptions?:
    {
        shouldHighlight: boolean,
        style: string,
        delay: number
    },
}

const defaultProps =
{
    cursor: "|",
    writeSpeed: 150,
    deleteSpeed: 0,

    pauseWriteDelay: 500,
    pauseDeleteDelay: 450,

    highlightOptions:
    {
        shouldHighlight: false,
        style: "",
        delay: 0
    },
}

const TypeWriter = (inProps: PropType) =>
{
    const props = {...defaultProps, ...inProps}
    const [TWState, setTWState] = useState<state>(state.PauseWrite);
    const [wordIndex, setWordIndex] = useState<number>(0)
    const [currentWord, setCurrentWord] = useState<string>("")
    const [shouldHightlight, setShouldHighlight] = useState<boolean>(false)


    const writeWord = () =>
    {
        setTimeout(() =>
        {
            if (props.words[wordIndex].length !== currentWord.length)
            {
                let newWord = currentWord;

                newWord += props.words[wordIndex][newWord.length];

                setCurrentWord(newWord)
            }
            else
            {
                setTWState(state.PauseDelete)
            }
        }, props.writeSpeed)
    }

    const deleteWord = () =>
    {
        setTimeout(() =>
        {
            if (currentWord.length !== 0)
            {
                if (props.deleteSpeed <=0)
                {
                    setCurrentWord("")
                }
                else
                {
                    setCurrentWord(currentWord.substring(0, currentWord.length - 1))
                }
            }
            else
            {
                setWordIndex(index => (index + 1) % props.words.length);

                setShouldHighlight(false)

                setTWState(state.PauseWrite)
            }
        }, props.deleteSpeed)
    }

    useEffect(() =>
    {
        if (TWState === state.PauseWrite)
        {
            setTimeout(() => setTWState(state.Write), props.pauseWriteDelay);
        }
        else if (TWState === state.PauseDelete)
        {
            const transitionToDelete = () =>setTimeout(() => setTWState(state.Delete), props.pauseDeleteDelay);

            if (props.highlightOptions?.shouldHighlight)
            {
                setTimeout(() =>
                {
                    setShouldHighlight(true);
                    transitionToDelete();
                }, props.highlightOptions?.delay);
            }
            else
            {
                transitionToDelete()
            }
        }
    }, [TWState])


    useEffect(() =>
    {
        if (TWState === state.Write)
        {
            writeWord()
        }
        else if (TWState === state.Delete)
        {
            deleteWord()
        }
    }, [TWState, currentWord])

  return (
      <span className={`${props.wordStyle} ${shouldHightlight? props.highlightOptions?.style: ""}`}>{currentWord}<span className='animate-pulse'>{props.cursor}</span></span>
  );
}

export default TypeWriter
