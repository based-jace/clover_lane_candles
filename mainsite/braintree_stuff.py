import braintree
from .secret import braintree_creds as bt_creds

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id=bt_creds["merchant_id"],
        public_key=bt_creds["public_key"],
        private_key=bt_creds["private_key"]
    )
)