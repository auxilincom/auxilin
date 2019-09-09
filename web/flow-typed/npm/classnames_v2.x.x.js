// flow-typed signature: 05f3dad8810e99e8737acdc3939d043d
// flow-typed version: c6154227d1/classnames_v2.x.x/flow_>=v0.104.x

type $npm$classnames$Classes =
  | string
  | { [className: string]: *, ... }
  | false
  | void
  | null;

declare module "classnames" {
  declare module.exports: (
    ...classes: Array<$npm$classnames$Classes | $npm$classnames$Classes[]>
  ) => string;
}

declare module "classnames/bind" {
  declare module.exports: $Exports<"classnames">;
}

declare module "classnames/dedupe" {
  declare module.exports: $Exports<"classnames">;
}
