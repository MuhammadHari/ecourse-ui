import { observer } from "mobx-react";
import { useQuery } from "@root/models";
import { useToggle } from "@hooks/use-toggle";
import * as React from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@material-ui/lab";
import { VerifiedUser } from "@material-ui/icons";
import { useApp } from "@providers/app-provider/provider";

const emails: string[] = [
  "teacher@app.com",
  "teacher1@app.com",
  "student@app.com",
];

export const Dev = observer(() => {
  const { data, setQuery } = useQuery<any>((root) => root.queryAuth());
  const { updateUser, user } = useApp();
  const [hover, { force }] = useToggle();
  const doLogin = (email: string) => {
    return () => {
      setQuery((store) =>
        store.mutateLogin({
          email,
          password: "password",
        })
      );
    };
  };
  const qAuth = () => setQuery((store) => store.queryAuth());
  React.useEffect(() => {
    if (data && data.login) {
      qAuth();
    }
    if (data && typeof data.auth !== "undefined") {
      updateUser(data.auth);
    }
  }, [data]);

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      open={hover}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
      }}
      onMouseEnter={force(true)}
      onMouseLeave={force(false)}
      icon={<SpeedDialIcon />}
    >
      {emails.map((item) => (
        <SpeedDialAction
          key={item}
          FabProps={{
            disabled: Boolean(user && user.email === item),
          }}
          onClick={doLogin(item)}
          tooltipTitle={`Login ${item}`}
          icon={<VerifiedUser />}
        />
      ))}
    </SpeedDial>
  );
});
