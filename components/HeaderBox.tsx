const HeaderBox = ({ type = "title", title, user, subtext }: HeaderBoxProps) => {
  return (
    //header-box
    <div className="flex flex-col gap-1">
      {/* header-box-title */}
      <h2 className="text-24 lg:text-30 font-semibold text-gray-900">
        {title}
        {type === 'greeting' && 
          <span className="text-bankGradient">
            &nbsp;{user}
          </span>
        }
      </h2>
      {/* header-box-subtext */}
      <p className="text-14 lg:text-16 font-normal text-gray-600">{subtext}</p>
    </div>
  )
}

export default HeaderBox