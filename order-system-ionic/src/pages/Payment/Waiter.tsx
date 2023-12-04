import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Dialog, { ButtonProps } from "../../components/Dialog/Dialog";
import Layout from "../../components/Layout";
import { resetBill } from "../../redux/actions/billActions";
import { resetOrder } from "../../redux/actions/orderActions";

const Waiter = () => { 
    const dispatch = useDispatch();
    const history = useHistory()
    const [resetAlert, setResetAlert] = useState(true);

    const resetTableButtons: ButtonProps[] = [
        {
          text: "Yes, reset table",
          primary: true,
          onClick: () => {
            setResetAlert(false);
            dispatch(resetBill());
            dispatch(resetOrder());
            history.push('/');
          },
        }
      ];
    return(
        <Layout pageTitle="Waiter">
            <Dialog
                title="Are you sure you want to reset this table?"
                content="This will reset all order history and bills."
                buttons={resetTableButtons}
                isOpen={resetAlert}
            />
        </Layout>
    )
}

export default Waiter;