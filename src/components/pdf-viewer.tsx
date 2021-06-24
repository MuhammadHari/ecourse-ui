import * as React from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { createContext, useContext } from "react";
import {
  Box,
  IconButton,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { useNodeDimension } from "@hooks/use-node-dimension";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface State {
  current: number;
  total: number;
}

export interface UsePdfController extends State {
  nextDisabled: boolean;
  prevDisabled: boolean;
  next(): void;
  prev(): void;
  onLoad(e: any): void;
}

type Props = {
  url: string;
  disableController?: boolean;
  disableBottomController?: boolean;
  height?: string;
  playedRef?: React.MutableRefObject<number>;
  CustomController?: React.ComponentType<any>;
};

const Ctx = createContext<null | UsePdfController>(null);

export class PdfViewerProvider extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      total: 0,
      current: 0,
    };
    if (this.props.playedRef) {
      this.props.playedRef.current = 0;
    }
  }

  onLoad: UsePdfController["onLoad"] = ({ numPages }: any) => {
    this.setState({
      total: numPages,
      current: 1,
    });
  };

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ) {
    if (prevState.current !== this.state.current && this.props.playedRef) {
      this.props.playedRef.current = this.state.current;
    }
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({
      current,
    });
  };
  next = () => {
    const current = this.state.current + 1;
    this.setState({
      current,
    });
  };
  getContextValue = (): UsePdfController => ({
    ...this.state,
    prev: this.prev,
    next: this.next,
    nextDisabled: this.state.current === this.state.total,
    prevDisabled: this.state.current <= 1,
    onLoad: this.onLoad,
  });
  render() {
    return (
      <Ctx.Provider value={this.getContextValue()}>
        {this.props.children}
      </Ctx.Provider>
    );
  }
}

export function usePdfController() {
  return useContext(Ctx) as UsePdfController;
}

type Action = {
  title: string;
  icon: React.ReactNode;
  onClick(a: any): any;
  disabled: boolean;
};

const Controller = () => {
  const { current, total, prevDisabled, nextDisabled, next, prev } =
    usePdfController();

  const buttons: Action[] = [
    {
      title: "Halaman sebelumnya",
      icon: <ArrowBack />,
      onClick: prev,
      disabled: prevDisabled,
    },
    {
      title: "Halaman selanjutnya",
      icon: <ArrowForward />,
      onClick: next,
      disabled: nextDisabled,
    },
  ];
  const theme = useTheme();
  return (
    <Box
      top={0}
      bgcolor={theme.palette.primary.main}
      color="white"
      display="flex"
      style={{ alignItems: "center" }}
    >
      <Box marginX={1} textAlign="center">
        {current} / {total}
      </Box>
      <Box marginLeft="auto">
        {buttons.map((item) => (
          <Tooltip
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={item.title}
            key={item.title}
          >
            <IconButton
              disabled={item.disabled}
              color="inherit"
              onClick={item.onClick}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

const Wrap = ({
  url,
  disableController = false,
  disableBottomController = false,
  CustomController,
}: React.PropsWithChildren<Props>) => {
  const control = usePdfController();
  const { current, onLoad } = control;
  const {
    nodeRef,
    dimension: { width },
  } = useNodeDimension();
  const CustomC = CustomController ? CustomController : React.Fragment;
  return (
    <div ref={nodeRef as any}>
      {/*// @ts-ignore*/}
      <CustomC {...(CustomController ? (control as UsePdfController) : {})} />
      {!disableController ? <Controller /> : null}
      <Document file={url} onLoadSuccess={onLoad}>
        <Page width={width} pageNumber={current ?? 1} />
      </Document>
      {!disableController && !disableBottomController ? <Controller /> : null}
    </div>
  );
};

export const PdfViewer = (props: Props) => {
  const ctx = usePdfController();
  const Wrapper = !ctx ? PdfViewerProvider : React.Fragment;
  return (
    <Wrapper {...props}>
      <Wrap {...props} />
    </Wrapper>
  );
};
