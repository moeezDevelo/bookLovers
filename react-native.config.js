
module.exports = {
    project: {
        ios: {},
        android: {}, // grouped into "project"
    },
    assets: ["./src/utills/Fonts"], // stays the same
    dependencies: {
        'tipsi-stripe': {
          platforms: {
            android: null,
            ios: null,
          }
        }
      },
};