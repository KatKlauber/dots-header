/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, useReducer } from 'react';
import styles from './MainSection.module.scss';

import { Cell, Grid } from '../../components/Grid';
import BouncingArrow from '../../components/BouncingArrow';
import DotGrid from '../../components/DotGrid';

// eslint-disable-next-line no-shadow
enum ActionKind {
  DotsArray = 'LEFTDOTSARRAY',
  PlacementArray = 'LEFTPLACEMENTARRAY',
  ElementBoxes = 'ELEMENTBOXES',
  ElementBoxPlacement = 'ELEMENTBOXPLACEMENT',
  CombinedLeftGridArray = 'COMBINEDLEFTGRIDARRAY',
  AddArray1ToCombinedArray = 'ADDARRAY1TOCOMBINEDARRAY',
  OverlappingArraysCheck = 'OVERLAPPINGARRAYSCHECK',
  PartialDotsArrays = 'PARTIALDOTSARRAYS',
  FinalLeftGridArray = 'FINALLEFTGRIDARRAY',
  FinalRightGridArray = 'FINALRIGHTGRIDARRAY',
}

type Action = {
  type: ActionKind;
};

type State = {
  textBox1: HTMLElement | null;
  textBox1Placement: DOMRect | undefined;
  textBox2: HTMLElement | null;
  textBox2Placement: DOMRect | undefined;
  arrowBox: HTMLElement | null;
  arrowBoxPlacement: DOMRect | undefined;
  mainSectionBox: HTMLElement | null;
  mainSectionBoxPlacement: DOMRect | undefined;
  leftDotBoxes: HTMLElement[];
  leftDotPlacement: DOMRect[];
  rightDotBoxes: HTMLElement[];
  rightDotPlacement: DOMRect[];
  text1Overlap: boolean[];
  text2Overlap: boolean[];
  arrowOverlap: boolean[];
  partialDotsLeft: boolean[];
  partialDotsRight: boolean[];
  leftGridArray: boolean[];
  rightGridArray: boolean[];
  originalLeftGrid: boolean[];
  originalRightGrid: boolean[];
};
const leftDotGrid = [
  // row 1
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  // row 2
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  // row 3
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  false,
  // row 4
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  // row 5
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  // row 6
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  // row 7
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  // row 8
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  // row 9
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  // row 10
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  // row 11
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  // row 12
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  // row 13
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  // row 14
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  // row 15
  false,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  // row 16
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  // row 17
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
];
const rightDotGrid = [
  // row 1
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  // row 2
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  false,
  // row 3
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  // row 4
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  // row 5
  true,
  true,
  false,
  false,
  true,
  true,
  true,
  true,
  // row 6
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  // row 7
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  // row 8
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  // row 9
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  // row 10
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  // row 11
  true,
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  // row 12
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  // row 13
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  // row 14
  true,
  false,
  false,
  true,
  true,
  false,
  true,
  false,
  // row 15
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  // row 16
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  // row 17
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
];
const checkOverlap = (dotState: DOMRect[], elementPlacement: DOMRect | undefined): boolean[] => {
  let overlappingArray: boolean[] = [];
  overlappingArray = dotState.map((dotBox): boolean => {
    if (elementPlacement !== undefined) {
      const overlappingState =
        dotBox.top > elementPlacement.bottom ||
        dotBox.right < elementPlacement.left ||
        dotBox.bottom < elementPlacement.top ||
        dotBox.left > elementPlacement.right;
      return overlappingState;
    }
    return false;
  });
  return overlappingArray;
};
const handlePartialDots = (
  dotState: DOMRect[],
  elementPlacement: DOMRect | undefined
): boolean[] => {
  let partialDotsArray: boolean[] = [];
  partialDotsArray = dotState.map((dotBox): boolean => {
    if (elementPlacement !== undefined) {
      const partialState =
        dotBox.top < elementPlacement.bottom &&
        dotBox.bottom > elementPlacement.bottom - 0.025 * elementPlacement.height;
      return !partialState;
    }
    return true;
  });
  return partialDotsArray;
};

const combineArray = (array1: boolean[], array2: boolean[]): boolean[] => {
  let combinedArray: boolean[] = [];
  combinedArray = array1.map((dot): boolean => {
    const newDot = dot;
    return newDot;
  });
  array2.forEach((dotBoolean, index): void => {
    if (dotBoolean === false) {
      combinedArray.splice(index, 1, false);
    }
  });
  return combinedArray;
};

const dotBoxReducer = (state: State, action: Action): State => {
  const { type } = action;
  switch (type) {
    case ActionKind.DotsArray:
      return {
        ...state,
        leftDotBoxes: Array.prototype.slice.call(
          document.getElementById('leftDots')?.getElementsByClassName('redDot')
        ),
        rightDotBoxes: Array.prototype.slice.call(
          document.getElementById('rightDots')?.getElementsByClassName('redDot')
        ),
      };
    case ActionKind.PlacementArray:
      return {
        ...state,
        leftDotPlacement: state.leftDotBoxes.map((redDot) => redDot.getBoundingClientRect()),
        rightDotPlacement: state.rightDotBoxes.map((redDot) => redDot.getBoundingClientRect()),
      };
    case ActionKind.ElementBoxes:
      return {
        ...state,
        textBox1: document.getElementById('textBox1'),
        textBox2: document.getElementById('textBox2'),
        arrowBox: document.getElementById('arrowBox'),
        mainSectionBox: document.getElementById('mainSection'),
      };
    case ActionKind.ElementBoxPlacement:
      return {
        ...state,
        textBox1Placement: state.textBox1?.getBoundingClientRect(),
        textBox2Placement: state.textBox2?.getBoundingClientRect(),
        arrowBoxPlacement: state.arrowBox?.getBoundingClientRect(),
        mainSectionBoxPlacement: state.mainSectionBox?.getBoundingClientRect(),
      };
    case ActionKind.OverlappingArraysCheck:
      return {
        ...state,
        text1Overlap: checkOverlap(state.leftDotPlacement, state.textBox1Placement),
        text2Overlap: checkOverlap(state.rightDotPlacement, state.textBox2Placement),
        arrowOverlap: checkOverlap(state.leftDotPlacement, state.arrowBoxPlacement),
        partialDotsLeft: handlePartialDots(state.leftDotPlacement, state.mainSectionBoxPlacement),
        partialDotsRight: handlePartialDots(state.rightDotPlacement, state.mainSectionBoxPlacement),
      };
    case ActionKind.CombinedLeftGridArray:
      return {
        ...state,
        leftGridArray: combineArray(state.text1Overlap, state.arrowOverlap),
      };
    case ActionKind.PartialDotsArrays:
      return {
        ...state,
        leftGridArray: combineArray(state.leftGridArray, state.partialDotsLeft),
        rightGridArray: combineArray(state.text2Overlap, state.partialDotsRight),
      };
    case ActionKind.FinalLeftGridArray:
      return {
        ...state,
        leftGridArray: combineArray(state.leftGridArray, state.originalLeftGrid),
      };
    case ActionKind.FinalRightGridArray:
      return {
        ...state,
        rightGridArray: combineArray(state.rightGridArray, state.originalRightGrid),
      };
    default:
      return {
        ...state,
      };
  }
  return state;
};

const MainSection = (): JSX.Element => {
  const [leftGrid, setLeftGrid] = useState<boolean[]>(leftDotGrid);
  const [rightGrid, setRightGrid] = useState<boolean[]>(rightDotGrid);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  type WindowSize = {
    width: number | undefined;
    height: number | undefined;
  };
  type textBox1Dimensions = {
    width: number | undefined;
    height: number | undefined;
  };
  // https://usehooks.com/useWindowSize/
  const isClient = typeof window === 'object';
  const getSize = (): WindowSize => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  };
  const [windowSize, setWindowSize] = useState(getSize);
  const mounted = useRef(false);
  const ref = useRef(null);
  const useTextBox1Size = (): textBox1Dimensions => {
    const [textBox1Size, setTextBox1Size] = useState<textBox1Dimensions>({} as textBox1Dimensions);
    // check for text box size changes for breakpoints
    useEffect(() => {
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.contentRect) {
            setTextBox1Size(entry.contentRect);
          }
        });
      });
      if (mounted.current === true) {
        if (ref.current) {
          resizeObserver.observe(ref.current);
          return () => resizeObserver.disconnect();
        }
      }
      return () => resizeObserver.disconnect();
    }, [mounted.current]);
    return textBox1Size;
  };
  const { width } = useTextBox1Size();
  // window resize use effect
  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize(getSize());
    };
    if (isClient) {
      window.addEventListener('resize', handleResize);
    }
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);
  const hasDotBoxes = useRef(false);
  const hasElements = useRef(false);
  const hasComparisonArrays = useRef(false);
  const hasCombinedGrid = useRef(false);
  const includesOriginalGrid = useRef(false);
  const includesPartialDots = useRef(false);
  const [state, dispatch] = useReducer(dotBoxReducer, {
    textBox1: null,
    textBox1Placement: undefined,
    textBox2: null,
    textBox2Placement: undefined,
    arrowBox: null,
    arrowBoxPlacement: undefined,
    mainSectionBox: null,
    mainSectionBoxPlacement: undefined,
    leftDotBoxes: [],
    leftDotPlacement: [],
    rightDotBoxes: [],
    rightDotPlacement: [],
    text1Overlap: [],
    text2Overlap: [],
    arrowOverlap: [],
    partialDotsLeft: [],
    partialDotsRight: [],
    leftGridArray: [],
    rightGridArray: [],
    originalLeftGrid: leftGrid,
    originalRightGrid: rightGrid,
  });
  // get box coordinates if component has already been mounted
  useEffect(() => {
    if (mounted.current === true) {
      dispatch({ type: ActionKind.DotsArray });
      dispatch({ type: ActionKind.PlacementArray });
      hasDotBoxes.current = true;
      // setDotBoxes(true);
    }
  }, [mounted.current]);
  // get text and arrow box placement if we have dot box coordinates
  useEffect(() => {
    if (hasDotBoxes.current === true) {
      if (state.leftDotPlacement.length > 0 && state.rightDotPlacement.length > 0) {
        dispatch({ type: ActionKind.ElementBoxes });
        dispatch({ type: ActionKind.ElementBoxPlacement });
        hasElements.current = true;
      }
    }
  }, [hasDotBoxes.current]);
  // if we have coordinates of arrow and text boxes, compare them with dot box coordinates
  useEffect(() => {
    if (hasElements.current === true) {
      if (
        state.textBox1Placement !== undefined &&
        state.textBox2Placement !== undefined &&
        state.arrowBoxPlacement !== undefined &&
        state.mainSectionBoxPlacement !== undefined
      ) {
        dispatch({ type: ActionKind.OverlappingArraysCheck });
        hasComparisonArrays.current = true;
      }
    }
  }, [hasElements.current]);
  // if the overlap arrays have content, combine the ones for arrow and text box for the left grid
  useEffect(() => {
    if (hasComparisonArrays.current === true) {
      if (
        state.text1Overlap.length > 0 &&
        state.text2Overlap.length > 0 &&
        state.arrowOverlap.length > 0 &&
        state.partialDotsLeft.length > 0 &&
        state.partialDotsRight.length > 0
      ) {
        dispatch({ type: ActionKind.CombinedLeftGridArray });
        hasCombinedGrid.current = true;
      }
    }
  }, [hasComparisonArrays.current]);
  // if the overlap arrays are not all true or false, look for partial dots
  useEffect(() => {
    if (hasCombinedGrid.current === true) {
      const falseResults = state.leftGridArray.filter((dots) => {
        return dots === false;
      }).length;
      const trueResults = state.leftGridArray.filter((dots) => {
        return dots === true;
      }).length;
      if (
        falseResults < state.leftGridArray.length &&
        trueResults < state.leftGridArray.length &&
        state.leftGridArray.length > 0
      ) {
        dispatch({ type: ActionKind.PartialDotsArrays });
        includesPartialDots.current = true;
      }
    }
  }, [hasCombinedGrid.current]);
  // if the overlap arrays are not all true or false, combine with partial dots arrays
  useEffect(() => {
    if (includesPartialDots.current === true) {
      const falseLeftResults = state.leftGridArray.filter((dots) => {
        return dots === true;
      }).length;
      const trueLeftResults = state.leftGridArray.filter((dots) => {
        return dots === true;
      }).length;
      const falseRightResults = state.rightGridArray.filter((dots) => {
        return dots === true;
      }).length;
      const trueRightResults = state.rightGridArray.filter((dots) => {
        return dots === true;
      }).length;
      if (
        falseLeftResults < state.leftGridArray.length &&
        trueLeftResults < state.leftGridArray.length &&
        state.leftGridArray.length > 0 &&
        falseRightResults < state.rightGridArray.length &&
        trueRightResults < state.rightGridArray.length &&
        state.rightGridArray.length > 0
      ) {
        dispatch({ type: ActionKind.FinalLeftGridArray });
        dispatch({ type: ActionKind.FinalRightGridArray });
        includesOriginalGrid.current = true;
      }
    }
  }, [includesPartialDots.current]);
  // if right and left arrays are not empty or all true or false, set the state for left and right grid to pass the boolean arrays back to the dot component, turning each one on or off accordingly
  useEffect(() => {
    if (includesOriginalGrid.current === true) {
      const falseLeftResults = state.leftGridArray.filter((dots) => {
        return dots === true;
      }).length;
      const trueLeftResults = state.leftGridArray.filter((dots) => {
        return dots === true;
      }).length;
      const falseRightResults = state.rightGridArray.filter((dots) => {
        return dots === true;
      }).length;
      const trueRightResults = state.rightGridArray.filter((dots) => {
        return dots === true;
      }).length;
      if (
        falseLeftResults < state.leftGridArray.length &&
        trueLeftResults < state.leftGridArray.length &&
        state.leftGridArray.length > 0 &&
        falseRightResults < state.rightGridArray.length &&
        trueRightResults < state.rightGridArray.length &&
        state.rightGridArray.length > 0
      ) {
        setLeftGrid(state.leftGridArray);
        setRightGrid(state.rightGridArray);
      }
    }
  }, [includesOriginalGrid.current]);
  useEffect(() => {
    dispatch({ type: ActionKind.DotsArray });
    dispatch({ type: ActionKind.PlacementArray });
    const getRedDots = async (): Promise<void> => {
      if (state.leftDotPlacement.length > 0 && state.rightDotPlacement.length > 0) {
        dispatch({ type: ActionKind.ElementBoxes });
        dispatch({ type: ActionKind.ElementBoxPlacement });
        if (
          state.textBox1Placement !== undefined &&
          state.textBox2Placement !== undefined &&
          state.arrowBoxPlacement !== undefined &&
          state.mainSectionBoxPlacement !== undefined
        ) {
          dispatch({ type: ActionKind.OverlappingArraysCheck });
          if (
            state.text1Overlap.length > 0 &&
            state.text2Overlap.length > 0 &&
            state.arrowOverlap.length > 0 &&
            state.partialDotsLeft.length > 0 &&
            state.partialDotsRight.length > 0
          ) {
            dispatch({ type: ActionKind.CombinedLeftGridArray });
            const falseResults = state.leftGridArray.filter((dots) => {
              return dots === false;
            }).length;
            const trueResults = state.leftGridArray.filter((dots) => {
              return dots === true;
            }).length;
            if (
              falseResults < state.leftGridArray.length &&
              trueResults < state.leftGridArray.length &&
              state.leftGridArray.length > 0
            ) {
              dispatch({ type: ActionKind.PartialDotsArrays });
              const falseLeftPartials = state.leftGridArray.filter((dots) => {
                return dots === true;
              }).length;
              const trueLeftPartials = state.leftGridArray.filter((dots) => {
                return dots === true;
              }).length;
              const falseRightPartials = state.rightGridArray.filter((dots) => {
                return dots === true;
              }).length;
              const trueRightPartials = state.rightGridArray.filter((dots) => {
                return dots === true;
              }).length;
              if (
                falseLeftPartials < state.leftGridArray.length &&
                trueLeftPartials < state.leftGridArray.length &&
                state.leftGridArray.length > 0 &&
                falseRightPartials < state.rightGridArray.length &&
                trueRightPartials < state.rightGridArray.length &&
                state.rightGridArray.length > 0
              ) {
                dispatch({ type: ActionKind.FinalLeftGridArray });
                dispatch({ type: ActionKind.FinalRightGridArray });
                const falseLeftResults = state.leftGridArray.filter((dots) => {
                  return dots === true;
                }).length;
                const trueLeftResults = state.leftGridArray.filter((dots) => {
                  return dots === true;
                }).length;
                const falseRightResults = state.rightGridArray.filter((dots) => {
                  return dots === true;
                }).length;
                const trueRightResults = state.rightGridArray.filter((dots) => {
                  return dots === true;
                }).length;
                if (
                  falseLeftResults < state.leftGridArray.length &&
                  trueLeftResults < state.leftGridArray.length &&
                  state.leftGridArray.length > 0 &&
                  falseRightResults < state.rightGridArray.length &&
                  trueRightResults < state.rightGridArray.length &&
                  state.rightGridArray.length > 0
                ) {
                  setLeftGrid(state.leftGridArray);
                  setRightGrid(state.rightGridArray);
                }
              }
            }
          }
        }
      }
    };
    const comparePlacement = async (): Promise<void> => {
      await getRedDots().then(() => {
        getSize();
        setIsLoading(false);
      });
    };
    comparePlacement();
  }, [isLoading, windowSize, width]);
  // check to see if the component is mounted, later using the ref to kick off checking dot placement so we don't get empty values
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  
  const [titleText, setTitleText] = useState("Title");
  
  const handleTitleChange = (event: any): void => {
    setTitleText(event.target.value);
  };
  
  const [subtitleText, setSubtitleText] = useState("This is a subtitle");
  
  const handleSubtitleChange = (event: any): void => {
    setSubtitleText(event.target.value);
  };
  
  const [bodyText, setBodyText] = useState("This is a body text paragraph that is a description of the subtitle content.");
  
  const handleBodyChange = (event: any): void => {
    setBodyText(event.target.value);
  };

  return (
    <div className={styles.MainSection} id="mainSection">
      <Grid colsMedium={2}>
        <Cell padding={false} widthXlarge={50}>
          <div className={styles.dotsContainer}>
            <DotGrid itemId="leftDots" coordinatesArray={leftGrid} />
          </div>
          <div className={styles.Header}>
            <div className={styles.title} id="textBox1" ref={ref}>
              <span id="titleInput" className={styles.input} role="textbox" contentEditable onChange={(event) => handleTitleChange(event)}>
                {titleText}
              </span>
            </div>
            {/*replace this with some other element*/}
            <div className={styles.arrow} id="arrowBox">
              <BouncingArrow />
            </div>
          </div>
        </Cell>
        <Cell padding={false} widthXlarge={50}>
          <div className={styles.dotsContainer2}>
            <DotGrid itemId="rightDots" coordinatesArray={rightGrid} />
          </div>
          <div className={styles.BodyContainer}>
            <div className={styles.Body} id="textBox2">
              <span id="subtitleInput" className={styles.input} role="textbox" contentEditable onChange={(event) => handleSubtitleChange(event)}>{subtitleText}</span>
              {/*turn this into a text area input with a max length and a default value to demo the variable height of the hero component*/}
              <span id="bodyInput" className={styles.input} role="textbox" contentEditable onChange={(event) => handleBodyChange(event)}>
                {bodyText}
              </span>
            </div>
          </div>
        </Cell>
      </Grid>
    </div>
  );
};

export default MainSection;
