import lemlist from "../../lemlist.app.mjs";

export default {
  key: "lemlist-mark-lead-from-one-campaigns-as-interested",
  name: "Mark Lead From One Campaigns As Interested",
  description: "This action marks a specific lead as interested using its email in a specific campaign. [See the docs here](https://developer.lemlist.com/#mark-as-interested-a-lead-in-a-specific-campaign)",
  version: "0.0.1",
  type: "action",
  props: {
    lemlist,
    campaignId: {
      propDefinition: [
        lemlist,
        "campaignId",
      ],
      withLabel: true,
    },
    email: {
      propDefinition: [
        lemlist,
        "email",
        (c) => ({
          campaignId: c.campaignId.value,
        }),
      ],
      async options({ campaignId }) {
        const leads = await this.listLeads({
          campaignId,
        });

        return leads.map((email) => ({
          label: email,
          value: email,
        }));
      },
    },
  },
  async run({ $ }) {
    const response = await this.lemlist.markLeadInOneCampaign({
      $,
      email: this.email,
      campaignId: this.campaignId.value,
      action: "interested",
    });

    $.export("$summary", `Successfully added ${this.email} lead as interested in ${this.campaignId.label} campaign!`);
    return response;
  },
};
